const otpType = {
  Registration : 0,
  Reset_Password: 1

};

const requestStatus = {
  Pending: 'pending',
  Processing: 'processing', 
  Completed: 'completed'
};

// const requestType = {
//   Transcript:'transcript',
//   Transfer: 'transfer', 
//   Clearance: 'clearance'
// };

const paymentStatus = {
  Unpaid: 'not paid',
  Paid: 'paid',
}


module.exports ={
  otpType,
  // requestType,
  requestStatus,
  paymentStatus
}