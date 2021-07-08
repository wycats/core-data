import "./test-support/tests.css";

import $ from "../src/domquery";

const APP = $("#app").single;

APP.insert("<h1>Hello world</h1>");
