import clsx from 'clsx';
import { Fragment, useMemo } from 'react';
import { JobOpening } from '../../lib/types';

type Props = {
  jobs: JobOpening[];
};

const groupByDepartment = (
  jobs: JobOpening[],
): Record<string, JobOpening[]> => {
  const grouped: Record<string, JobOpening[]> = {};

  jobs.forEach((job) => {
    const department = job.departmentName;

    if (!grouped[department]) {
      grouped[department] = [];
    }

    grouped[department].push(job);
  });

  return grouped;
};

export const JobList = ({ jobs }: Props) => {
  const groupedByDepartment = useMemo(() => groupByDepartment(jobs), [jobs]);
  const departments = useMemo(
    () => Object.keys(groupedByDepartment),
    [groupedByDepartment],
  );

  return (
    <>
      {departments.map((dept) => {
        const deptJobs = groupedByDepartment[dept];

        return (
          <Fragment key={dept}>
            <h3
              className={clsx('text-lg', 'font-bold', 'text-slate-700', 'mb-2')}
            >
              {dept}
            </h3>
            <ul className={clsx('mb-8', 'grid', 'sm:grid-cols-2', 'gap-2')}>
              {deptJobs.map((job) => (
                <li
                  key={job.jobTitle}
                  className={clsx(
                    'text-purple-600',
                    'hover:text-purple-500',
                    'hover:underline',
                  )}
                >
                  <a href={job.url}>{job.jobTitle}</a>
                </li>
              ))}
            </ul>
          </Fragment>
        );
      })}
    </>
  );
};
