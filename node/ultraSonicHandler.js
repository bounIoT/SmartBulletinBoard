if(msg.payload<20){
    msg.payload='geldi'
}else if (msg.payload>100){
    msg.payload='gitti'
}else{
    msg.payload='bos'
}
return msg;
