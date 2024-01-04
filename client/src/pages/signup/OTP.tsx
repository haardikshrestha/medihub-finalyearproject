export default function OTP ()  {
   return (
      <div className="flex h-screen">
        {/* Left Panel */}
        <div className="bg-lime-300 w-auto relative overflow-hidden flex items-center justify-center">
          <img src="src/assets/otp.svg" alt="" className="h-full w-full object-cover" />
        </div>
  
        {/* Right Panel */}
        <div className="bg-slate-50 w-1/2 flex flex-col justify-evenly py-10 text-center">
          <section className="w-3/4 mx-auto flex flex-col gap-10">
            {/* Title Section */}
            <div className="title">
              <h3 className="text-gray-800 text-2xl font-bold py-4">Verify Account</h3>
              <p className="w-3/4 text-gray-400 mx-auto text-sm">
                Please enter the OTP pin received in your email.
              </p>
            </div>
  
            {/* Form Section */}
            <form className="flex flex-col gap-5" >
             
  
              {/* Password Input */}
              <div className="flex border rounded-xl relative hover:border-lime-500">
                <input
                  type="text"
                  name="otp"
                  id=""
                  placeholder="OTP"
                  required
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 outline-none border-none"
                />
                <span
                  className="icon flex items-center px-4 cursor-pointer"
                  
                >
                  
                </span>
              </div>
  
              {/* Submit Button */}
              <div className="input-button">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-lime-400 to-lime-500 rounded-xl py-2 text-gray-50 text-sm"
                >
                  Verify
                </button>
              </div>
              
            </form>
  
            
          </section>
        </div>
      </div>
    );
}