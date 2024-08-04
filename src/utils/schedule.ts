import {CronJob} from "cron";
import {
  monthlyExpireSubscriptions, yearlyExpireSubscriptions,
} from "../services/subscriptionServices";

const executeSwarm = async () => {
  try {
    await monthlyExpireSubscriptions();
    await yearlyExpireSubscriptions();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
const job = new CronJob("*/59 * * * *", executeSwarm);
job.start();
