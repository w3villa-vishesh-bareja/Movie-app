import { createSlice } from "@reduxjs/toolkit";

const initialState = {
//   user: null,
  token: false,
  loading: false,
  isClicked:false,
  user:{},
  errors: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsClicked:(state , action)=>{
        state.isClicked = action.payload;
    },
    setUser:(state , action) =>{
        state.user = action.payload
    }
    // logout: (state) => {
    //   state.user = null;
    //   state.token = null;
    //   sessionStorage.removeItem("token");
    // },
  },
});

export const { setLoading, setErrors, setToken, setIsClicked ,setUser} = authSlice.actions;
export default authSlice.reducer;