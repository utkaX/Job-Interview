let notificationList=[{
    "userId" : "610a12345678901234567890", // references User model
    "message" : "New job posting available",
    "timestamp" : "2022-02-15T14:30:00.000Z",
    "isRead" : false,
    "alert" : false,
    "priority" : "low",
    "category" : "application",
    "jobType" : "630a12345678901234567890", // references JobType model
    "__v" : 0
  }
]
module.exports={data:notificationList};
  