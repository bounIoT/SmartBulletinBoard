
msg.query = {"ad_name" : msg.payload.ad_name };
msg.payload = { $push: { "applied_students_id": {"id":msg.payload.applier_id }}};
return msg;
