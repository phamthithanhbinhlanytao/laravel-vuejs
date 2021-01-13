<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create(['name'=>'Web Design']);
        Category::create(['name'=>'Test Automation']);
        Category::create(['name'=>'Marketing Online']);
        Category::create(['name'=>'System Admin']);
    }
}
