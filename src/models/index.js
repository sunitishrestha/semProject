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
User.hasMany(RefreshToken, { foreignKey: "userId", as: "refreshTokens" });
RefreshToken.belongsTo(User, { foreignKey: "userId", as: "user" });

// Venue ↔ Event
Venue.hasMany(Event, { foreignKey: "venue_id", as: "events" });
Event.belongsTo(Venue, { foreignKey: "venue_id", as: "venue" });

// Department ↔ Event
Department.hasMany(Event, { foreignKey: "department_id", as: "events" });
Event.belongsTo(Department, { foreignKey: "department_id", as: "department" });

// Event ↔ Sponsor
Event.hasMany(Sponsor, { foreignKey: "event_id", as: "sponsors" });
Sponsor.belongsTo(Event, { foreignKey: "event_id", as: "event" });

// Event ↔ Ticket
Event.hasMany(Ticket, { foreignKey: "event_id", as: "tickets" });
Ticket.belongsTo(Event, { foreignKey: "event_id", as: "event" });

// User ↔ Volunteer
User.hasMany(Volunteer, { foreignKey: "user_id", as: "volunteers" });
Volunteer.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Department ↔ Volunteer
Department.hasMany(Volunteer, {
  foreignKey: "department_id",
  as: "volunteers",
});
Volunteer.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});

// Event ↔ Volunteer
Event.hasMany(Volunteer, { foreignKey: "event_id", as: "volunteers" });
Volunteer.belongsTo(Event, { foreignKey: "event_id", as: "event" });

// User ↔ Lead
User.hasMany(Lead, { foreignKey: "user_id", as: "leads" });
Lead.belongsTo(User, { foreignKey: "user_id", as: "user" });

// Requirement ↔ Lead
Requirement.hasMany(Lead, { foreignKey: "req_id", as: "leads" });
Lead.belongsTo(Requirement, { foreignKey: "req_id", as: "requirement" });

// Event ↔ Lead
Event.hasMany(Lead, { foreignKey: "event_id", as: "leads" });
Lead.belongsTo(Event, { foreignKey: "event_id", as: "event" });

// Event ↔ Participation
Event.hasMany(Participation, { foreignKey: "event_id", as: "participations" });
Participation.belongsTo(Event, { foreignKey: "event_id", as: "event" });

// Department ↔ Requirement
Department.hasMany(Requirement, {
  foreignKey: "department_id",
  as: "requirements",
});
Requirement.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});

// Participation ↔ Attendance
Participation.hasMany(Attendance, { foreignKey: "part_id", as: "attendances" });
Attendance.belongsTo(Participation, {
  foreignKey: "part_id",
  as: "participation",
});

// Lead ↔ Attendance
Lead.hasMany(Attendance, { foreignKey: "lead_id", as: "attendances" });
Attendance.belongsTo(Lead, { foreignKey: "lead_id", as: "lead" });

// Volunteer ↔ Attendance
Volunteer.hasMany(Attendance, {
  foreignKey: "volunteer_id",
  as: "attendances",
});
Attendance.belongsTo(Volunteer, {
  foreignKey: "volunteer_id",
  as: "volunteer",
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
