import { config } from "./config.js";
import Slack from "slack-node";

// slack webhook 설정
const slack = new Slack();
slack.setWebhook(config.slack.webhookURL);

export async function post(method, url, statusCode, from, message) {
    slack.webhook({
        text: `----- ${method} ${url}: ${statusCode}\nwhere: ${from}\nerror: ${message}`,
    }, function (err, response) { })
}