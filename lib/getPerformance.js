import { DOCTOR_TYPES } from '../constants/common';

export default async function getPerformance() {
  if (performance === undefined) {
    return { perf: undefined, time: undefined };
  }

  const performanceStart = performance.now();

  performance.mark('api/v1/doctors start');
  await fetch(`${process.env.PUBLIC_URL}/api/v1/doctors`);
  performance.mark('api/v1/doctors end');

  performance.mark('api/v1/institutions start');
  await fetch(`${process.env.PUBLIC_URL}/api/v1/institutions`);
  performance.mark('api/v1/institutions end');

  DOCTOR_TYPES.forEach(type => {
    performance.mark(`api/v1/doctors/${type} start`);
    fetch(`${process.env.PUBLIC_URL}/api/v1/doctors/${type}`);
    performance.mark(`api/v1/doctors/${type} end`);
  });

  performance.mark('api/v1/doctor/zrnic-milko start');
  await fetch(`${process.env.PUBLIC_URL}/api/v1/doctor/zrnic-milko`);
  performance.mark('api/v1/doctor/zrnic-milko end');

  performance.mark('api/v1/doctor/zrnic-milko/609753 start');
  await fetch(`${process.env.PUBLIC_URL}/api/v1/doctor/zrnic-milko/609753`);
  performance.mark('api/v1/doctor/zrnic-milko/609753 end');

  performance.measure(
    'api/v1/doctors',
    'api/v1/doctors start',
    'api/v1/doctors end'
  );
  performance.measure(
    'api/v1/institutions',
    'api/v1/institutions start',
    'api/v1/institutions end'
  );

  DOCTOR_TYPES.forEach(type => {
    performance.measure(
      `api/v1/doctors/${type}`,
      `api/v1/doctors/${type} start`,
      `api/v1/doctors/${type} end`
    );
  });

  performance.measure(
    'api/v1/doctor/zrnic-milko',
    'api/v1/doctor/zrnic-milko start',
    'api/v1/doctor/zrnic-milko end'
  );
  performance.measure(
    'api/v1/doctor/zrnic-milko/609753',
    'api/v1/doctor/zrnic-milko/609753 start',
    'api/v1/doctor/zrnic-milko/609753 end'
  );

  const performanceEnd = performance.now();

  const perf = performance.getEntriesByType('measure');
  const duration = performanceEnd - performanceStart;

  return {
    perf,
    time: { start: performanceStart, end: performanceEnd, duration },
  };
}
