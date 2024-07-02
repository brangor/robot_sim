"use strict";
// src/__tests__/unit/Robot.test.ts
Object.defineProperty(exports, "__esModule", { value: true });
const Robot_1 = require("../../models/Robot");
function getLastMessage(robot) {
    const messages = robot.dumpMessageQueue();
    if (messages.length === 0) {
        return undefined;
    }
    return messages[messages.length - 1];
}
describe('Robot', () => {
    let robot;
    beforeEach(() => {
        robot = new Robot_1.Robot();
    });
    test("should not be able to move before being placed", () => {
        robot.move();
        robot.report();
        expect(getLastMessage(robot)).toBe(undefined);
    });
    test("should not turn left before being placed", () => {
        robot.turn("LEFT");
        robot.report();
        expect(getLastMessage(robot)).toBe(undefined);
    });
    test("should not turn right before being placed", () => {
        robot.turn("RIGHT");
        robot.report();
        expect(getLastMessage(robot)).toBe(undefined);
    });
    test('should be placeable', () => {
        robot.place({ coordinates: { x: 2, y: 2 }, direction: "NORTH" });
        robot.report();
        expect(getLastMessage(robot)).toBe("Output: 2,2,NORTH");
    });
    describe('after being placed', () => {
        beforeEach(() => {
            robot.place({ coordinates: { x: 2, y: 2 }, direction: "NORTH" });
        });
        test('should be moveable', () => {
            robot.move();
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 2,3,NORTH");
        });
        test('should be able to turn left', () => {
            robot.turn("LEFT");
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 2,2,WEST");
        });
        test('should be able to turn right', () => {
            robot.turn("RIGHT");
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 2,2,EAST");
        });
        test('should be able to move in all directions', () => {
            robot.move();
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 2,3,NORTH");
            robot.turn("LEFT");
            robot.move();
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 1,3,WEST");
            robot.turn("LEFT");
            robot.move();
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 1,2,SOUTH");
            robot.turn("LEFT");
            robot.move();
            robot.report();
            expect(getLastMessage(robot)).toBe("Output: 2,2,EAST");
        });
    });
});
