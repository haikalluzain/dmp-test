import { useEffect, useState } from "react";
import { Api } from "../../utils/api";
import { IJob } from "../../interfaces/IJob";
import { Link } from "react-router-dom";
import Navbar from "../../components/Header/Navbar";
import moment from "moment";

function DateDisplay({ dateString }: any) {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = moment(dateString);
    const now = moment();

    const daysAgo = now.diff(date, "days");
    const monthsAgo = now.diff(date, "months");
    const yearsAgo = now.diff(date, "years");

    if (yearsAgo >= 1) {
      setFormattedDate(`${yearsAgo > 1 ? `${yearsAgo} years` : "a year"} ago`);
    } else if (monthsAgo >= 1) {
      setFormattedDate(
        `${monthsAgo > 1 ? `${monthsAgo} months` : "a month"} ago`
      );
    } else if (daysAgo === 0) {
      setFormattedDate("Today");
    } else if (daysAgo === 1) {
      setFormattedDate("1 day ago");
    } else {
      setFormattedDate(`${daysAgo} days ago`);
    }
  }, [dateString]);

  return <div>{formattedDate}</div>;
}

const JobList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLastPage, setLastPage] = useState(false);
  const [jobList, setJobList] = useState<IJob[]>([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState(false);

  useEffect(() => {
    getData(pageNumber);
  }, []);

  const getData = async (
    page: number,
    refresh: boolean | undefined = false
  ) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/jobs`, {
        params: {
          page,
          description: description ? description.toLowerCase() : null,
          location: location ? location.toLowerCase() : null,
          full_time: fullTime === true ? true : null,
        },
      });
      let newData = jobList.concat(data);
      if (refresh) {
        newData = data;
      }
      newData = newData.filter(function (el) {
        return el != null;
      });
      if (!newData.length) {
        setLastPage(true);
      } else {
        setLastPage(false);
      }
      setJobList(newData);
    } catch (error: any) {
      if (error?.code === 404) {
        setLastPage(true);
        setPageNumber(pageNumber - 1);
      }
    }
  };

  const getMoreJob = () => {
    getData(pageNumber + 1);
    setPageNumber(pageNumber + 1);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="my-4">
              <form action="">
                <div className="form-group row align-items-end">
                  <div className="col-4">
                    <label
                      htmlFor=""
                      className="mb-0 font-weight-bold text-dark"
                    >
                      Job Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFirstName"
                      placeholder="Filter by title, benefits, companies, expertise"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="col-4">
                    <label
                      htmlFor=""
                      className="mb-0 font-weight-bold text-dark"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFirstName"
                      placeholder="Filter by city, state, zip code or country"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="col-2">
                    <div className="custom-control custom-checkbox small">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck"
                        checked={fullTime}
                        onChange={() => setFullTime(!fullTime)}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck"
                      >
                        Full Time Only
                      </label>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-block btn-secondary"
                      onClick={async (e) => {
                        e.preventDefault();
                        getData(1, true);
                        setPageNumber(1);
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="card shadow o-hidden border-0">
              <div className="card-body">
                <p className="h2 font-weight-bold text-dark py-3">Job List</p>
                {jobList.length ? (
                  jobList.map(
                    (job, i) =>
                      job && (
                        <div key={i}>
                          <Link to={`/jobs/${job.id}`}>
                            <hr className="mt-0" />
                            <div className="row">
                              <div className="col-6">
                                <div className="text-left">
                                  <p className="text-primary mb-1">
                                    <b>{job.title}</b>
                                  </p>
                                  <p>
                                    <span className="text-muted">
                                      {job.company}
                                    </span>{" "}
                                    - <b className="text-success">{job.type}</b>
                                  </p>
                                </div>
                              </div>
                              <div className="col-6">
                                <div className="text-right text-muted">
                                  <p className="mb-0">{job.location}</p>
                                  <div>
                                    <DateDisplay dateString={job.created_at} />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )
                  )
                ) : (
                  <div className="alert alert-secondary" role="alert">
                    No data found
                  </div>
                )}
                {!isLastPage ? (
                  <div className="mt-2">
                    <button
                      onClick={getMoreJob}
                      className="btn btn-block btn-primary"
                    >
                      More Jobs
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobList;
