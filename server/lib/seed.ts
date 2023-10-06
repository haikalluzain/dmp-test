import {generateHash} from "@utils/password";
import UserModel from "@models/User";
import {IUser} from "@interfaces/IUser";
import Logger from "@lib/logger";

export default async () => {
    const seedUser: IUser = {
        name: "Administrator",
        email: "admin@gmail.com",
        password: "12345678"
    }
    const findUser = await UserModel.findOne({ email: seedUser.email })
    const generatedPassword = await generateHash(seedUser.password)


    if (!findUser) {
        await UserModel.create({
            name: seedUser.name,
            email: seedUser.email,
            password: generatedPassword
        })
        Logger.info('Seed user successfully!')
    }
}