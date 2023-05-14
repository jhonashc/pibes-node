import otpGenerator from "otp-generator";

export const generateOpt = (): string => {
  return otpGenerator.generate(5, {
    lowerCaseAlphabets: false,
    specialChars: false,
  });
};
