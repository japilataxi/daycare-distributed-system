import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10,
  duration: "20s",
  thresholds: {
    http_req_failed: ["rate<0.01"],   // <1% failures
    http_req_duration: ["p(95)<800"], // 95% of requests < 800ms
  },
};

export default function () {
  const url = "http://localhost:3002/attendance/check-in";
  const payload = JSON.stringify({
    childId: `child-${__VU}-${__ITER}`, // unique-ish per request
    checkedInBy: "staff-01",
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "status is 201": (r) => r.status === 201,
  });

  sleep(1);
}
