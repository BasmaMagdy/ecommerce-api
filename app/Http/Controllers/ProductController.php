<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->query()) {
            // No filters: use a static cache key
            $products = Cache::remember('products', 60, function () {
                return Product::filter()->paginate(10);
            });
        } else {
            // Filters applied: use a dynamic cache key
            $cacheKey = 'products_' . md5(json_encode($request->query()));

            $products = Cache::remember($cacheKey, 60, function () use ($request) {
                $query = Product::query();

                if ($request->filled('name')) {
                    $query->where('name', 'like', '%' . $request->name . '%');
                }

                if ($request->filled('min_price')) {
                    $query->where('price', '>=', $request->min_price);
                }

                if ($request->filled('max_price')) {
                    $query->where('price', '<=', $request->max_price);
                }

                if ($request->filled('category')) {
                    $query->where('category', $request->category);
                }

                return $query->paginate(10);
            });
        }

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
}
