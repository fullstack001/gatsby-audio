// import React from "react";
// import { Provider } from "react-redux";
// import store from "./store";

// export const warpRootElement = ({ element }) => {
//   return <Provider store={store}>{element}</Provider>;
// };
// // import React from 'react'
// import Layout from "./src/components/Layout"

export const onRouteUpdate = ({ location, prevLocation }) => {
  /*=====================================================
  A simple throttle function
  =====================================================*/
  function CustomThrottle(func, limit) {
    var lastFunc, lastRan;
    return function () {
      var context = this,
        args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  /*=====================================================
  sticky nav
  =====================================================*/
  var navType = document.querySelector(".site-wrap").getAttribute("data-nav");
  var header = document.querySelector(".site-header");
  if (typeof header !== undefined && header !== null && navType === "sticky") {
    window.addEventListener(
      "scroll",
      CustomThrottle(function () {
        var currScroll = window.pageYOffset;
        if (currScroll > 1) {
          header.classList.add("small");
        } else {
          header.classList.remove("small");
        }
      }, 50)
    );
  }
  /*=====================================================
    Responsive table
    =====================================================*/
  var tables = document.querySelectorAll("table");
  if (tables.length > 0) {
    tables.forEach(function (table) {
      var wrapper = document.createElement("div");
      wrapper.classList.add("table-responsive");
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }
};

export { default as wrapRootElement } from "./src/state/ReduxWrapper";
