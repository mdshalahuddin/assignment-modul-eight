import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ExpenceList from "./ExpenceList";

const ExpenceForm = () => {
  const addSweetalert2 = withReactContent(sweetalert2);
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState("");
  const [newExpence, setNewExpence] = useState("");
  const [expenceList, setExpenceList] = useState([]);
  const [expenceId, setExpenceId] = useState(0);
  const [isAllDelete, setIsAllDelete] = useState(false);

  useEffect(() => {
    (async () => {
      let expenceInfo = await localStorage.getItem("expenceList");
      expenceInfo = expenceInfo ? await JSON.parse(expenceInfo) : [];
      setExpenceList(expenceInfo);
      if (newExpence) {
        await expenceInfo.push(newExpence);
        // await setExpenceList((prevList) => [...prevList, newExpence]);
        await localStorage.setItem("expenceList", JSON.stringify(expenceInfo));
        addSweetalert2.fire("Success", "Information Saved", "success");
      }

      if (expenceId > 0) {
        expenceInfo = await expenceInfo.filter(
          (expence) => expence.id !== expenceId
        );
        await localStorage.setItem("expenceList", JSON.stringify(expenceInfo));
        setExpenceList(expenceInfo);
        setExpenceId(0);
        addSweetalert2.fire("Success", "Information Deleted", "success");
      }

      if (isAllDelete) {
        await localStorage.removeItem("expenceList");
        setExpenceList([]);
        setIsAllDelete(false);
      }
    })();
  }, [newExpence, expenceId, isAllDelete]);

  const formatDate = (date) => {
    return date
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      addSweetalert2.fire("Error", "Enter Expence Title", "error");
      return;
    }
    const data = { id: Date.now(), date: formatDate(date), title, amount };
    setNewExpence(data);
  };

  const deleteExpence = (id) => {
    addSweetalert2.fire({
      title: <p>Are you sure you want to delete information?</p>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      console.log("result: ", result);
      if (result.isConfirmed) {
        setExpenceId(id);
        addSweetalert2.fire(
          "Deleted!",
          "Your all incomes has been deleted.",
          "success"
        );
      } else {
        addSweetalert2.fire("Cancelled", "Your all information is safe :)", "error");
      }
    });
  };

  const allExpenceDelete = () => {
    if (expenceList.length > 0) {
      addSweetalert2.fire({
        title: <p>Are you sure you want to delete all information?</p>,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        console.log("result: ", result);
        if (result.isConfirmed) {
          setIsAllDelete(true);
          addSweetalert2.fire(
            "Deleted!",
            "Your all incomes has been deleted.",
            "success"
          );
        } else {
          addSweetalert2.fire("Cancelled", "Your all information is safe :)", "error");
        }
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
          <div className="card">
            <div className="card-header text-center">
              <h3>Add Your Expence</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formSubmit}>
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
                    <label htmlFor="date">Date</label>
                    <div className="form-group mt-2">
                      <ReactDatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
                    <label htmlFor="amount">Amount</label>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col">
                    <label htmlFor="title">Title</label>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col text-end">
                    <label htmlFor=""></label>
                    <div className="form-group mt-2">
                      <button type="submit" className="btn btnc">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6 col">
          <ExpenceList
            expenceList={expenceList}
            deleteExpence={deleteExpence}
            allExpenceDelete={allExpenceDelete}
            isForm={true}
          />
        </div>
      </div>
    </>
  );
};

export default ExpenceForm;
