import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };

    case SET_GRIDVIEW:
      return { ...state, grid_view: true };

    // ----------------------

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;

      let tempProducts = [...filtered_products];

      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "a-z") {
        // tempProducts = tempProducts.name.sort();
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "z-a") {
        tempProducts = tempProducts.sort(
          (a, b) => -a.name.localeCompare(b.name)
        );
      }
      return { ...state, filtered_products: tempProducts };

    // -------------
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

 
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;

      let tempProducts_filters = [...all_products];

      // Filtering
      if (text) {
        tempProducts_filters = tempProducts_filters.filter((product) => {
          return product.name.toLowerCase().includes(text);
        });
      }
      // CATEGORY
      if (category !== "all") {
        tempProducts_filters = tempProducts_filters.filter((product) => {
          return product.category.includes(category);
        });
      }
      // COMPANY
      if (company !== "all") {
        tempProducts_filters = tempProducts_filters.filter((product) => {
          return product.company === company;
        });
      }
      // COLOR
      if (color !== "all") {
        tempProducts_filters = tempProducts_filters.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      // PRICE
      if (price !== "all") {
        tempProducts_filters = tempProducts_filters.filter((product) => {
          return product.price <= parseInt(price, 10);
        });
      }
      // SHIPPING
      if (shipping) {
        tempProducts_filters = tempProducts_filters.filter((product) => {
          return product.shipping === true;
        });
      }

      return { ...state, filtered_products: tempProducts_filters };

    
    






    
    
    


    
    
    
    
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      return state;
  }

  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
