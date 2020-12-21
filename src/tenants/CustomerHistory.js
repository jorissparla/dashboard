import React from "react";

const CustomerHistory = ({ ...rest }) => {
  return (
    <div className="mt-20 w-full">
      <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
        <section aria-labelledby="payment_details_heading">
          <form action="#" method="POST">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
              <div class="bg-white py-6 px-4 sm:p-6">
                <div>
                  <h2 id="payment_details_heading" class="text-lg leading-6 font-medium text-gray-900">
                    Event Details
                  </h2>
                  <p class="mt-1 text-sm text-gray-500">Enter Event Information.</p>
                </div>

                <div class="mt-2 grid grid-cols-3 gap-6">
                  <div class="col-span-4 sm:col-span-4">
                    <label for="email_address" class="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea type="text" name="email_address" id="email_address" autocomplete="email" class="form-textarea resize-none" />
                  </div>

                  <div class="col-span-1 sm:col-span-1">
                    <label for="expiration_date" class="block text-sm font-medium text-gray-700">
                      Number of users
                    </label>
                    <input type="number" name="expiration_date" id="expiration_date" autocomplete="cc-exp" class="form-input" />
                  </div>
                  <div class="col-span-1 sm:col-span-1">
                    <label for="expiration_date" class="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input type="date" name="expiration_date" id="expiration_date" autocomplete="cc-exp" class="form-input" />
                  </div>

                  <div class="col-span-1 sm:col-span-1">
                    <label for="country" class="block text-sm font-medium text-gray-700">
                      Activity Type
                    </label>
                    <select id="country" name="country" autocomplete="country" class="form-input">
                      <option>Go Live</option>
                      <option>Migration</option>
                      <option>Test</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
export default CustomerHistory;
