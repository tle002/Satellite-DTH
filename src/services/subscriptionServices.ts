import { Package } from "./../entity/Package";
import { Subscription } from "./../entity/Subscription";
import { User } from "../entity/User";
import { appDataSource } from "../dataSource";
import { Response } from "express";
import { LessThan } from "typeorm";
const curr_Subscription = appDataSource.getRepository(Subscription);
const curr_Package = appDataSource.getRepository(Package);
const curr_User = appDataSource.getRepository(User);
export const subscribePackageService = async (
  userId: number,
  packId: number,
  res: Response
) => {
  try {
    const user = await curr_User.findOneBy({ id: userId });
    const pack = await curr_Package.findOneBy({ id: packId });

    if (!user || !pack) {
      throw new Error("User or Package not found");
    }

    const startDate: Date = new Date();
    const subscription = curr_Subscription.create({
      userId,
      packId,
      startDate,
      duration: "yearly",
    });

    const savedSubscription = await curr_Subscription.save(subscription);
    return savedSubscription;
  } catch (error) {
    throw new Error("server error found");
  }
};

export const subscribeAddonService = async (
  userId: number,
  packId: number,
  res: Response
) => {
  try {
    const user = await curr_User.findOneBy({ id: userId });
    const pack = await curr_Package.findOneBy({ id: packId });
    if (!user || !pack) {
      throw new Error("User or Package not found");
    }
    if (!userId || !packId) {
      return res.send("User or Package not found");
    }
    const startDate: number = new Date().getTime();
    const subscription = curr_Subscription.create({
      userId,
      packId,
      startDate,
      duration: "monthly",
    });
    const savedSubscription = await curr_Subscription.save(subscription);
    if (savedSubscription) {
      return savedSubscription;
    } else {
      throw new Error("Error At Subscription");
    }
  } catch (error) {
    throw new Error("Error At Subscription");
  }
};

export const yearlyExpireSubscriptions = async () => {
  try {
    const milliseconds: number = new Date().getTime();
    const oneYearDuration = 1 * 365 * 24 * 60 * 60 * 1000;
    const expiryDate = new Date(milliseconds - oneYearDuration);

    console.log("Current Date:", new Date());
    console.log("One Year Ago:", expiryDate);

    const expiredYearlySubscriptions = await curr_Subscription.find({
      where: {
        duration: "yearly",
        startDate: LessThan(new Date(milliseconds - oneYearDuration)),
      },
    });

    if (!expiredYearlySubscriptions) {
      return { message: "User or Package not found" };
    } else {
      let deletedYearlySubscription = expiredYearlySubscriptions.map(
        async (expiredSubscription) => {
          await curr_Subscription.delete({
            id: expiredSubscription.id,
          });
        }
      );
      return { success: true, deletedYearlySubscription };
    }
  } catch (error) {
    console.error(`Failed to check and expire subscriptions: ${error}`);
  }
};

export const monthlyExpireSubscriptions = async () => {
  try {
    const milliseconds: number = new Date().getTime();
    const oneMonthDuration = 1 * 30 * 24 * 60 * 60 * 1000;

    const expiredMonthlySubscriptions = await curr_Subscription.find({
      where: {
        duration: "monthly",
        startDate: LessThan(new Date(milliseconds - oneMonthDuration)),
      },
    });
    if (!expiredMonthlySubscriptions) {
      return { message: "User or Package not found" };
    } else {
      let deletedMonthlySubscription = expiredMonthlySubscriptions.map(
        async (expiredSubscription: Subscription) => {
          await curr_Subscription.delete({
            id: expiredSubscription.id,
          });
        }
      );
      return { success: true, deletedMonthlySubscription };
    }
  } catch (error) {
    console.error(`Failed to check and expire subscriptions: ${error}`);
  }
};
