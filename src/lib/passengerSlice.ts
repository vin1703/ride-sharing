import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PassengerState {
  id: string;
  name: string;
  email: string;
  rideDetails?:any;
  token : string;
}

const initialState: PassengerState = {
  id: '',
  name: '',
  rideDetails:null,
  email: '',
  token:'',
};

export const passengerSlice = createSlice({
  name: 'passenger',
  initialState,
  reducers: {

    setUserInfo: (state, action: PayloadAction<PassengerState>) => {

      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    setRideDetails:(state,action: PayloadAction<PassengerState>)=>{
      state.rideDetails = action.payload;
    }
  },
});


export const { setUserInfo,setRideDetails } = passengerSlice.actions;

export default passengerSlice.reducer;
