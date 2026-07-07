import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";
import { hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { comparePassword } from "../utils/password.js";
class AuthService {
  async register(
    name: string,
    email: string,
    password: string
  ) {
    const existingUser =
      await userRepository.findByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword =
      await hashPassword(password);

    const user =
      await userRepository.createUser({
        name,
        email,
        password: hashedPassword,
      });

    const token = generateToken(user.id);

    const { password: _, ...safeUser } = user;

return {
  user: safeUser,
  token,
};
  }
  async login(
  email: string,
  password: string
) {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordCorrect =
    await comparePassword(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user.id);

  const { password: _, ...safeUser } = user;

return {
  user: safeUser,
  token,
};
}
}

export default new AuthService();