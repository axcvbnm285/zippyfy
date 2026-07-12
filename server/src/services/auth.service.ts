import ApiError from "../utils/ApiError.js";
import userRepository from "../repositories/user.repository.js";
import storeRepository from "../repositories/store.repository.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { generateSlug } from "../utils/slugify.js";
class AuthService {
  async registerStoreOwner(data: {
    name: string;
    email: string;
    password: string;
    storeName: string;
    storeAddress: string;
    storePhone: string;
    openTime: string;
    closeTime: string;
  }) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) throw new ApiError(409, "User already exists");

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.createUser({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "STORE_OWNER",
    });

    const store = await storeRepository.create({
      name: data.storeName,
      slug: generateSlug(data.storeName),
      address: data.storeAddress,
      phone: data.storePhone,
      openTime: data.openTime,
      closeTime: data.closeTime,
      ownerId: user.id,
    });

    const token = generateToken(user.id);
    const { password: _, ...safeUser } = user;
    return { user: safeUser, store, token };
  }

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