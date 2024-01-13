import { config } from "./config.js";
import Slack from "slack-node";

// slack webhook 설정
const slack = new Slack();
slack.setWebhook(config.slack.webhookURL);

export async function post(statusCode, url, from, message) {
    slack.webhook({
        text: `${url}: ${statusCode}\nwhere: ${from}\nerror: ${message}`,
    }, function (err, response) { })
}