import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../useContext";
import Product from "./Product";
import { BrandsService, CategoriesSerivce, ProductService } from "./Service";

const Store = () => {
  const userContext = useContext(UserContext);

  // states
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productToShow, setProductToShow] = useState([]);
  const [search, setSearch] = useState([])

  useEffect(() => {
    (async () => {
      // fetch brands
      let responseBrands = await BrandsService.fetchBrands();
      let responseBrandsBody = await responseBrands.json();
      responseBrands.ok &&
        responseBrandsBody.forEach((brand) => {
          brand.isChecked = true;
        });
      setBrands(responseBrandsBody);

      // fetch categories
      let responseCategories = await CategoriesSerivce.fetchCategories();
      let responseCategoriesBody = await responseCategories.json();
      responseCategories.ok &&
        responseCategoriesBody.forEach((category) => {
          category.isChecked = true;
        });
      setCategories(responseCategoriesBody);

      // fetch products
      let responseProducts = await fetch(`http://localhost:5001/products?productName_like=${search}`, {
        method: 'GET'
      })
      let responseProductsBody = await responseProducts.json();

      responseProducts.ok &&
        responseProductsBody.forEach((product) => {
          // add brand name to product
          product.brand = BrandsService.getBrandByBrandId(
            responseBrandsBody,
            product.brandId
          );

          // add category name to product
          product.category = CategoriesSerivce.getCategoryByCategoryId(
            responseCategoriesBody,
            product.categoryId
          );

          // add is order to product
          product.isOrdered = false;

          setProducts(responseProductsBody);
          updateProductsToShow(responseProductsBody);
        });
    })();
  }, [search]);

  // updateBrandIsChecked function //
  const updateBrandsIsChecked = (id) => {
    const brandsData = brands.map((brand) => {
      brand.id === id && (brand.isChecked = !brand.isChecked);
      return brand;
    });
    setBrands(brandsData);
    updateProductsToShow();
  };

  // updateCategoriesIsChecked //
  const updateCategoriesIsChecked = (id) => {
    const categoriesData = categories.map((category) => {
      category.id === id && (category.isChecked = !category.isChecked);
      return category;
    });
    setCategories(categoriesData);
    updateProductsToShow();
  };

  const onAddToCartClick = (propProduct) => {
    (async () => {
      let newOrder = {
        userId: userContext.user.currentUserId,
        productId: propProduct.id,
        quantity: 1,
        isPaymentCompleted: false,
      };

      const orderResponse = await fetch(`http://localhost:5001/orders`, {
        method: "POST",
        body: JSON.stringify(newOrder),
        headers: { "Content-type": "application/json" },
      });

      if (orderResponse.ok) {
        let orderResponseBody = await orderResponse.json();
        let prods = products.map((p) => {
          if (p.id === propProduct.id) p.isOrdered = true;
          return p;
        });
        setProducts(prods);
        updateProductsToShow();
      } else {
        console.log("Error");
      }
    })();
  };

  const updateProductsToShow = () => {
    setProductToShow(
      products.filter((prod) => {
        return (
          categories.filter(cat => cat.id === prod.categoryId && cat.isChecked).length > 0
        )
      }).filter((prod) => {
        return (
          brands.filter(brand => brand.id === prod.brandId && brand.isChecked).length > 0
        )
      })
    )
  };

  // JSX RETURN
  return (
    <div>
      <div className="flex">
        {/* ******************* start left side ******************* */}
        <div>
          <div className="flex flex-col w-1/6 h-screen">
            {/* start headers */}
            <div className="w-[120px] h-1/5 flex flex-col items-center justify-center">
              <p>{productToShow.length}</p>
              <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="border text-center border-slate-900 w-28 rounded-md focus:outline-none" />
            </div>
            {/* end of headers */}

            {/* start categories */}
            <div className="h-1/3 px-4 ">
              <div>
                <h1 className="sm:text-lg text-sm tracking-wide my-2  font-semibold">
                  Categories
                </h1>
                <div className=" h-1/2 flex flex-col justify-center items-left">
                  <div>
                    <ul>
                      {categories.map((category) => (
                        <li
                          className="sm:text-lg text-sm tracking-wide my-3 mx-3 font-light flex items-center"
                          key={category.id}
                        >
                          <input
                            className="w-4 h-4 my-3 text-blue-600 mr-3 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            value={"true"}
                            checked={category.isChecked}
                            type="checkbox"
                            id={`category${category.id}`}
                            onChange={() => {
                              updateCategoriesIsChecked(category.id);
                            }}
                          />
                          <label htmlFor={`category${category.id}`}>
                            {category.categoryName}
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* end of categories */}

            {/* start brands */}
            <div className=" h-1/2 flex flex-col justify-start px-3 items-left">
              <div>
                <h1 className="sm:text-lg text-sm tracking-wide my-2 font-semibold">
                  Brands
                </h1>
                <ul>
                  {brands.map((brand) => (
                    <li
                      className="sm:text-lg text-sm tracking-wide my-1 mx-3 font-light flex items-center"
                      key={brand.id}
                    >
                      <input
                        className="w-4 h-4 my-3 text-blue-600 mr-3 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        value={"true"}
                        checked={brand.isChecked}
                        type="checkbox"
                        id={`brand${brand.id}`}
                        onChange={() => {
                          updateBrandsIsChecked(brand.id);
                        }}
                      />
                      <label htmlFor={`brand${brand.id}`}>
                        {brand.brandName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* end of brands */}
          </div>
        </div>
        {/* ******************* end of left side ******************* */}

        {/* start right side */}
        <div className="flex flex-wrap w-full items-center justify-center">
          {productToShow.map((product) => (
            <div key={product.id} className="p-4">
              <Product product={product} onAddToCartClick={onAddToCartClick} />
            </div>
          ))}
        </div>
        {/* end of right side */}
      </div>
    </div>
  );
};

export default Store;
