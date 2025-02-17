import { Request, Response } from "express";
import { prisma } from "../..";
import bcrypt from "bcrypt";

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp: userOTP, password } = req.body;

  try {
    // input ees otp irehdee string turluur ireed bga uchraas int bolgoj bga heseg
    const otpNumber = parseInt(userOTP, 10);
    if (isNaN(otpNumber)) {
      res.status(400).json({
        message: "OTP string эсвэл буруу format-тай байна",
        success: false,
        code: "INVALID_OTP_FORMAT",
      });
      return;
    }

    // otp shalgalt
    const otpRecord = await prisma.otp.findFirst({
      where: { email, otp: otpNumber },
    });

    if (!otpRecord) {
      res.status(400).json({
        message: "OTP хугацаа дууссан эсвэл буруу OTP",
        success: false,
        code: "INVALID_OTP",
      });
      return;
    }

    // shine pass
    const hashedPass = await bcrypt.hash(password, Number(process.env.SALT));
    await prisma.user.update({
      where: { email },
      data: { password: hashedPass },
    });

    // hereglej duussan otpnuudaa delete hiih
    await prisma.otp.deleteMany({ where: { email } });

    res.status(200).json({
      message: "Нууц үг амжилттай солигдлоо",
      success: true,
      code: "PASS_CHANGED_SUCCESSFULLY",
    });
    return;
  } catch (error) {
    console.error("OTP шалгалт алдаа:", error);
    res.status(500).json({
      message: "Сервер талын алдаа",
      success: false,
      code: "SERVER_ERROR",
    });
    return;
  }
};
