import { NEXT_URL } from '../config';
import { DOCTOR_TYPES } from '../constants/common';

const BASE_URL = NEXT_URL.includes('http') ? NEXT_URL : `https://${NEXT_URL}`;

export default async function getPerformance() {
  if (performance === undefined) {
    return { perf: undefined, time: undefined };
  }

  const performanceStart = performance.now();

  performance.mark('api/v1/doctors start');
  await fetch(`${BASE_URL}/api/v1/doctors`);
  performance.mark('api/v1/doctors end');

  performance.mark('api/v1/institutions start');
  await fetch(`${BASE_URL}/api/v1/institutions`);
  performance.mark('api/v1/institutions end');

  performance.mark(`api/v1/doctors/gp start`);
  await fetch(`${BASE_URL}/api/v1/doctors/gp`);
  performance.mark(`api/v1/doctors/gp end`);

  performance.mark(`api/v1/doctors/ped start`);
  await fetch(`${BASE_URL}/api/v1/doctors/ped`);
  performance.mark(`api/v1/doctors/ped end`);

  performance.mark(`api/v1/doctors/gyn start`);
  await fetch(`${BASE_URL}/api/v1/doctors/gyn`);
  performance.mark(`api/v1/doctors/gyn end`);

  performance.mark(`api/v1/doctors/den start`);
  await fetch(`${BASE_URL}/api/v1/doctors/den`);
  performance.mark(`api/v1/doctors/den end`);

  performance.mark(`api/v1/doctors/den-s start`);
  await fetch(`${BASE_URL}/api/v1/doctors/den-s`);
  performance.mark(`api/v1/doctors/den-s end`);

  performance.mark(`api/v1/doctors/den-y start`);
  await fetch(`${BASE_URL}/api/v1/doctors/den-y`);
  performance.mark(`api/v1/doctors/den-y end`);

  performance.mark('api/v1/doctor/zrnic-milko start');
  await fetch(`${BASE_URL}/api/v1/doctor/zrnic-milko`);
  performance.mark('api/v1/doctor/zrnic-milko end');

  performance.mark('api/v1/doctor/zrnic-milko/609753 start');
  await fetch(`${BASE_URL}/api/v1/doctor/zrnic-milko/609753`);
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
