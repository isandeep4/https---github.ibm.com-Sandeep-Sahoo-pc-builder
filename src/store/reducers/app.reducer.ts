import { createReducer, on, Action } from '@ngrx/store';
import { AppState, CartItems } from '../app.interface';
import { didAllItemsLoaded, addProcessorToCart, addMbToCart, addRamToCart } from '../actions/app.action';



export const initialState: AppState = {
    productList: {
      processorList: [],
      motherboardList: [],
      ramList: [],
    },
    selectedProducts: {
      processorList: [],
      motherboardList: [],
      ramList: [],
    },
    apiResponse: false,
  };

export const initialCartState: CartItems = {
  selectedProducts: {
    processorList: [],
      motherboardList: [],
      ramList: [],
  }
}

export const _PcBuilderReducer = createReducer(
    initialState,
    on(didAllItemsLoaded, (state, action) => ({
      ...state,
      productList: {
        ...state.productList,
        processorList: action.statusResponse.processorList,
        motherboardList: action.statusResponse.motherboardList,
        ramList: action.statusResponse.ramList,
      },
      selectedProducts: {
        processorList: [],
        motherboardList: [],
        ramList: [],
      },
      apiResponse: action.apiResponse,
    })),
    on(addProcessorToCart, (state, action) => ({ 
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        processorList: [action.processor],
      },
    })),
    on(addMbToCart, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        motherboardList: [action.motherboard],
      },
    })),
    
    on(addRamToCart, (state, action) => ({
      ...state,
      selectedProducts: {
        ...state.selectedProducts,
        ramList: [action.ram],
      },
    })),
)

// export const _PcBuilderCartReducer = createReducer(
//   initialCartState,
//   on(addItemsToCart, (state, action) => ({
//     ...state,
//     selectedProducts: {
//       ...state.selectedProducts,
//       processorList: action.products.processorList,
//       motherboardList: action.products.motherboardList,
//       ramList: action.products.ramList,
//     },
//   }))
// )

export const PcBuilderReducer = (
    state: AppState,
    action: Action,
) => {
    return _PcBuilderReducer(state, action);
}

// export const selectAllItems = (state: AppState) => state.productList;
// export const selectProcessorItems = (state: AppState) => state.productList?.processorList;
// export const selectMotherboardItems = (state: AppState) => state.productList?.motherboardList;
// export const selectRamItems = (state: AppState) => state.productList?.ramList;

// export const PcBuilderCartReducer = (
//   state: CartItems,
//   action: Action,
// ) => {
//   return _PcBuilderCartReducer(state, action);
// }