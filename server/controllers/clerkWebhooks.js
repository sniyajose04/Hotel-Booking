import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
    try {
        console.log("📩 Webhook received");

        const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Verify using raw body buffer
        const evt = wh.verify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        console.log("✅ Webhook verified:", evt.type);

        if (evt.type === "user.created") {
            const data = evt.data;
            const email = data.email_addresses?.[0]?.email_address || "";

            const newUser = await User.create({
                _id: data.id, // Clerk ID as Mongo _id
                username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                email,
                image: data.profile_image_url,
                role: "user",
                recentSearchedCities: [],
            });

            console.log("✅ User saved:", newUser.email);
        }

        res.status(200).json({ message: "Webhook processed" });
    } catch (err) {
        console.error("❌ Webhook Error:", err.message);
        res.status(400).json({ error: "Invalid webhook" });
    }
};

export default clerkWebhooks;
