const {google}=require('googleapis');
const {OAuth2}=google.auth;

const oAuthClient = new OAuth2();
oAuth2Client.setCredentials({refresh_token})

const calendar=google.calendar({version:'v3',auth:oAuthClient})
const eventStartTime=new Date();
eventStartTime.setDate(eventStartTime.getDay()+2)
const eventEndTime=new Date();
eventEndTime.setDate(eventEndTime.getDay()+2)
eventEndTime.setMinutes(eventEndTime.getMinutes()+45)
 
const event={
    summary:'Birthday Party',
    location:'G-427 Alpha 2 Greater Noida',
    description:'Ana birthday Part',
    start:{
        dateTime: eventStartTime,
        timeZone:'India/Kolkata'
    },
    end:{
        dateTime: eventEndTime,
        timeZone:'India/Kolkata'
    },
    colorId:1,
}
calendar.freebusy.query({resource:{
   timeMin:eventStartTime,
   timeMax:eventEndTime,
   timeZone:'India/Kolkata' ,
   items:[{id:'primary'}],
}},(err,res)=>{
    if(err)
    return console.log('Free Busy Query Error',err);
    const eventsArr=res.data.calendars.primary.busy;
    if(eventsArr.length===0)return calendar.events.insert({calendarId:'primary',resource:event},(err =>{
        if (err) return console.error('Calendar Event Creation Error',err)
        return console.log('Calendar Event Created')
    }))
})