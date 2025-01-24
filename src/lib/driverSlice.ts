import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface driverState {
  id: string;
  name: string;
  email: string;
  AcceptedRide?:any
  isAvailable : boolean;
  token : string;
}

const initialState: driverState = {
  id: '',
  name: '',
  email: '',
  AcceptedRide:{},
  isAvailable : false,
  token:'',
};

export const driverSlice = createSlice({
  name: 'driver',
  initialState,
  reducers: {

    setDriverInfo: (state, action: PayloadAction<driverState>) => {

      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAvailable = action.payload.isAvailable;
      state.token = action.payload.token;
    },
    setAcceptedRide : (state,action:PayloadAction<driverState>)=>{
      state.AcceptedRide = action.payload
    }
  },
});


export const { setDriverInfo,setAcceptedRide } = driverSlice.actions;

export default driverSlice.reducer;
