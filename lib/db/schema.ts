import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  json,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }),
  birthDate: varchar("birth_date", { length: 50 }),
  birthTime: varchar("birth_time", { length: 50 }),
  birthPlace: text("birth_place"),
  gender: varchar("gender", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Module questions tracking
export const moduleQuestions = pgTable("module_questions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  module: varchar("module", { length: 50 }).notNull(),
  questionsRemaining: integer("questions_remaining").notNull().default(3),
  isPremium: boolean("is_premium").default(false),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Chat history
export const chats = pgTable("chats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  module: varchar("module", { length: 50 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  module: varchar("module", { length: 50 }).notNull(),
  amount: integer("amount").notNull(),
  currency: varchar("currency", { length: 10 }).default("INR"),
  status: varchar("status", { length: 50 }).notNull(),
  paymentId: varchar("payment_id", { length: 255 }),
  paymentDetails: json("payment_details"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id)
    .unique(),
  plan: varchar("plan", { length: 50 }).notNull().default("free"),
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  isActive: boolean("is_active").default(true),
  updatedAt: timestamp("updated_at").defaultNow(),
});
