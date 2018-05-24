
msg.query = {"ad_name" : msg.payload.ad_name };
msg.payload = { $inc: { "hovered_time": msg.payload.amount }};
return msg;
