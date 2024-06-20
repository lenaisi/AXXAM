// // userSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import cookie from 'js-cookie';

// // // Thunk pour la déconnexion
// // export const logout = createAsyncThunk('user/logout', async (_, { dispatch }) => {
// //   try {
// //     await axios.get('http://localhost:5000/api/v1/auth/logout', { withCredentials: true });
// //     cookie.remove('jwt', { expires: 1 });
// //     dispatch(log());
// //     console.log('Déconnexion réussie');
// //     window.location = '/';
// //   } catch (error) {
// //     console.error('Erreur lors de la déconnexion :', error);
// //   }
// // });

// // Thunk pour récupérer les données utilisateur (par exemple)
// export const fetchUserData = createAsyncThunk('user/fetchUserData', async () => {
//   const response = await axios.get('http://localhost:5000/jwtid'); // Modifier l'URL si nécessaire
//   return response.data;
// });

// // import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     currentUser: null,
//     loading: false,
//     error: false,
// };

// // export const userSlice = createSlice({
// //     name: "user",
// //     initialState,
// //     reducers: {
// //     loginStart: (state) => {
// //         state.loading = true;
// //     },
// //     loginSuccess: (state, action) => {
// //         state.loading = false;
// //         state.currentUser = action.payload;
// //     },
// //     loginFailure: (state) => {
// //         state.loading = false;
// //         state.error = true;
// //     },
// //     logout: (state) => {
// //         state.currentUser = null;
// //         state.loading = false;
// //         state.error = false;
// //     },
// //     },
// // });



// // export default userSlice.reducer;

// export const logoutUser = () => async (dispatch) => {
//     try {
//         await axios({
//             method: 'get',
//             url: "http://localhost:5000/api/v1/auth/logout",
//             withCredentials: true
//         });

//         cookie.remove('jwt', { expires: 1 });

//         Object.keys(localStorage).forEach(key => {
//             if (key !== 'persist:root') {
//                 localStorage.removeItem(key);
//             }
//         });
        
//         dispatch(userLogout());
//     } catch (err) {
//         console.log(err);
//     }

// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     isAuthenticated: true, // ou false selon votre logique
//     role: '',
//     user: null,
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     userLogout: (state) => {
//       state.isAuthenticated = false;
//       state.role = '';
//       state.user = null;
//       state.status = 'idle';
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchUserData.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchUserData.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//       })
//       .addCase(fetchUserData.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
//   name: "user",
//     initialState,
//     reducers: {
//     loginStart: (state) => {
//         state.loading = true;
//     },
//     loginSuccess: (state, action) => {
//         state.loading = false;
//         state.currentUser = action.payload;
//     },
//     loginFailure: (state) => {
//         state.loading = false;
//         state.error = true;
//     },
//     logout: (state) => {
//         state.currentUser = null;
//         state.loading = false;
//         state.error = false;
//     },
//     },
// });

// export const { userLogout } = userSlice.actions;
// export const { loginStart, loginSuccess, loginFailure, logout } =
// userSlice.actions;

// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
   
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUser } =
  userSlice.actions;

export default userSlice.reducer;