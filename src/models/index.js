const sequelize = require("../config/database");

// Import all models
const User = require("./User");
const RefreshToken = require("./RefreshToken");
const Department = require("./department");
const Venue = require("./venue");
const Event = require("./event");
const Sponsor = require("./sponsor");
const Ticket = require("./ticket");
const Volunteer = require("./volunteer");
const Lead = require("./lead");
const Participation = require("./participation");
const Requirement = require("./requirements");
const Attendance = require("./attendance");

// ====================
// Define Associations
// ====================

// User ↔ RefreshToken
User.hasMany(RefreshToken, {
  foreignKey: "userId",
  as: "refreshTokensForUser",
});
RefreshToken.belongsTo(User, {
  foreignKey: "userId",
  as: "userOfRefreshToken",
});

// Venue ↔ Event
Venue.hasMany(Event, { foreignKey: "venue_id", as: "eventsAtVenue" });
Event.belongsTo(Venue, { foreignKey: "venue_id", as: "venueOfEvent" });

// Department ↔ Event
Department.hasMany(Event, {
  foreignKey: "department_id",
  as: "eventsInDepartment",
});
Event.belongsTo(Department, {
  foreignKey: "department_id",
  as: "departmentOfEvent",
});

// Event ↔ Sponsor
Event.hasMany(Sponsor, { foreignKey: "event_id", as: "sponsorsForEvent" });
Sponsor.belongsTo(Event, { foreignKey: "event_id", as: "eventOfSponsor" });

// Event ↔ Ticket
Event.hasMany(Ticket, { foreignKey: "event_id", as: "ticketsForEvent" });
Ticket.belongsTo(Event, { foreignKey: "event_id", as: "eventOfTicket" });

// User ↔ Volunteer
User.hasMany(Volunteer, { foreignKey: "user_id", as: "volunteersOfUser" });
Volunteer.belongsTo(User, { foreignKey: "user_id", as: "userOfVolunteer" });

// Volunteer ↔ Department
Department.hasMany(Volunteer, {
  foreignKey: "department_id",
  as: "volunteersInDepartment",
});
Volunteer.belongsTo(Department, {
  foreignKey: "department_id",
  as: "departmentOfVolunteer",
});

// Event ↔ Volunteer
Event.hasMany(Volunteer, { foreignKey: "event_id", as: "volunteersForEvent" });
Volunteer.belongsTo(Event, { foreignKey: "event_id", as: "eventOfVolunteer" });

// User ↔ Lead
User.hasMany(Lead, { foreignKey: "user_id", as: "leadsOfUser" });
Lead.belongsTo(User, { foreignKey: "user_id", as: "userOfLead" });

// Requirement ↔ Lead
Requirement.hasMany(Lead, { foreignKey: "req_id", as: "leadsForRequirement" });
Lead.belongsTo(Requirement, { foreignKey: "req_id", as: "requirementOfLead" });

// Event ↔ Lead
Event.hasMany(Lead, { foreignKey: "event_id", as: "leadsForEvent" });
Lead.belongsTo(Event, { foreignKey: "event_id", as: "eventOfLead" });

// Event ↔ Participation
Event.hasMany(Participation, {
  foreignKey: "event_id",
  as: "participationsForEvent",
});
Participation.belongsTo(Event, {
  foreignKey: "event_id",
  as: "eventOfParticipation",
});

// Department ↔ Requirement
Department.hasMany(Requirement, {
  foreignKey: "department_id",
  as: "requirementsInDepartment",
});
Requirement.belongsTo(Department, {
  foreignKey: "department_id",
  as: "departmentOfRequirement",
});

// Participation ↔ Attendance
Participation.hasMany(Attendance, {
  foreignKey: "part_id",
  as: "attendancesForParticipation",
});
Attendance.belongsTo(Participation, {
  foreignKey: "part_id",
  as: "participationOfAttendance",
});

// Lead ↔ Attendance
Lead.hasMany(Attendance, { foreignKey: "lead_id", as: "attendancesForLead" });
Attendance.belongsTo(Lead, { foreignKey: "lead_id", as: "leadOfAttendance" });

// Volunteer ↔ Attendance
Volunteer.hasMany(Attendance, {
  foreignKey: "volunteer_id",
  as: "attendancesForVolunteer",
});
Attendance.belongsTo(Volunteer, {
  foreignKey: "volunteer_id",
  as: "volunteerOfAttendance",
});

// ====================
// Export all models
// ====================
module.exports = {
  sequelize,
  User,
  RefreshToken,
  Department,
  Venue,
  Event,
  Sponsor,
  Ticket,
  Volunteer,
  Lead,
  Participation,
  Requirement,
  Attendance,
};
