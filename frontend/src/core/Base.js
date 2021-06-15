import React from "react";
import Menu from "./Menu";

function Base({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) {
  return (
    <div>
      <Menu />
      <div className="container-fluid bg-dark text-white text-center">
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to contact us!</h4>
          <button className="btn btn-lg btn-warning">Contact us</button>
        </div>
        <div className="container">
          <span className="text-white">
            An amazing place to buy
            <span className="text-warning">T-shirt</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Base;
