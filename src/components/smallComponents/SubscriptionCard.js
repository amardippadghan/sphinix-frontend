import React from "react";

function SubscriptionCard({
  type,
  name,
  price,
  credits,
  users,
  isCurrentPlan,
  onButtonClick,
}) {
  return (
    <div className="w-full bg-white rounded-10 shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y">
      <div className="pt-[15px] px-[25px] pb-[25px]">
        <div className="flex justify-end">
          <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
            <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
              {type}
            </p>
          </div>
        </div>

        <div>
          <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
            {name}
          </p>
          <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
            {price}
          </p>
        </div>

        <div>
          <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
            {credits}
          </p>
          <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
            {users} Users
          </p>
        </div>
      </div>

      <div className="pt-[25px] px-[25px] pb-[35px]">
        <div className="mt-[25px]">
          {isCurrentPlan ? (
            <button className="bg-[#E1E3E5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
              Current Plan
            </button>
          ) : (
            <button
              className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
              onClick={onButtonClick}
            >
              Upgrade +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionCard;
