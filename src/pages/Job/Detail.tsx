import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Api } from "../../utils/api";
import { IJob } from "../../interfaces/IJob";
import { Parser } from "html-to-react";
import defaultLogo from "../../assets/img/placeholder/logoplaceholder.png";
import Navbar from "../../components/Header/Navbar";

const JobDetail = () => {
  const { id } = useParams();
  const [jobDetail, setJobDetail] = useState<IJob | null>(null);

  useEffect(() => {
    getData(id);
  }, []);

  const getData = async (id: any) => {
    try {
      const {
        data: { data },
      } = await Api().get(`/jobs/${id}`);
      setJobDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Link to="/jobs" className="btn btn-primary btn-icon-split my-4">
              <span className="icon text-white">
                <i className="fas fa-arrow-left"></i>
              </span>
              <span className="text">Back</span>
            </Link>
            <div className="card shadow o-hidden border-0">
              <div className="card-body">
                {jobDetail ? (
                  <>
                    <p className="mb-0">
                      {jobDetail.type} / {jobDetail.location}
                    </p>
                    <b className="h3 font-weight-bold text-dark">
                      {jobDetail.title}
                    </b>
                    <div>
                      <hr />
                      <div className="row">
                        <div className="col-8">
                          <div className="text-dark">
                            {Parser().parse(jobDetail.description)}
                          </div>
                        </div>
                        <div className="col-4">
                          <div>
                            <div className="card shadow-sm mb-3">
                              <div
                                className="card-header font-weight-bold text-dark"
                                style={{ backgroundColor: "#ffffff" }}
                              >
                                <div className="row">
                                  <div className="col-6">
                                    {jobDetail.company}
                                  </div>
                                  <div className="col-6 text-right">
                                    <span
                                      className="badge badge-light text-primary p-2"
                                      style={{ backgroundColor: "#ebedf6" }}
                                    >
                                      <b>1 other job</b>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body">
                                <img
                                  src={jobDetail.company_logo}
                                  alt="Company Logo"
                                  className="mb-2"
                                  onError={(e: any) =>
                                    (e.target.src = defaultLogo)
                                  }
                                />
                                <a href={jobDetail.company_url}>
                                  {jobDetail.company_url}
                                </a>
                              </div>
                            </div>
                            <div
                              className="card shadow-sm"
                              style={{ backgroundColor: "#fffef1" }}
                            >
                              <div
                                className="card-header font-weight-bold text-dark"
                                style={{ backgroundColor: "#fffef1" }}
                              >
                                How to apply
                              </div>
                              <div className="card-body">
                                {Parser().parse(jobDetail.how_to_apply)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetail;
