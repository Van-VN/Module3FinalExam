const BaseController = require("./base.controller");
const HomeStayModel = require("../model/homestay.model");
const fs = require("fs");
const qs = require("qs");
const url = require("url");
const homestayModel = require("../model/homestay.model");

class HomeController extends BaseController {
  async getHomePage(req, res) {
    let homestay = await HomeStayModel.getAllHome();
    let html = "";
    homestay.forEach((item, index) => {
      html += `<tr>
        <th scope="row">${index + 1}</th>
        <td><a href='/detail?id=${item.ID}'>${item.NAME}</a></td>
        <td>${item.CITY}</td>
        <td>${item.PRICE}</td>
        <td>
          <a href='/edit?id=${item.ID}' class="btn btn-success dash-btn">
            Sửa
          </a>
        </td>
        <td>
          <a href='./delete?id=${item.ID}'
            class="btn btn-danger dash-btn"
            onclick="return confirm('Bạn có chắc chắn muốn xóa?')"
          >
            Xóa
          </button>
        </td>
      </tr>`;
    });
    // let data = await this.getTemplate("././view/index.html");
    fs.readFile("./src/view/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        data = data.replace("{display-all-homestay}", html);
        res.writeHead(200, { "Content-type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }

  async getHomeStayByID(req, res) {
    let id = qs.parse(url.parse(req.url).query).id;
    let homestay = await HomeStayModel.getHomeById(id);
    fs.readFile("./src/view/detail.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        data = data.replace("{homestay-name}", homestay[0].NAME);
        data = data.replace("{homestay-city}", homestay[0].CITY);
        data = data.replace("{homestay-bedroom}", homestay[0].BEDROOM);
        data = data.replace("{homestay-restroom}", homestay[0].RESTROOM);
        data = data.replace("{homestay-price}", homestay[0].PRICE);
        data = data.replace("{homestay-des}", homestay[0].DES);
        res.writeHead(300, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }

  async deleteHome(req, res) {
    let id = qs.parse(url.parse(req.url).query).id;
    console.log(id);
    await homestayModel.deleteHome(id);
    res.writeHead(301, { Location: "/" });
    res.end(`done`);
  }

  async editHome(req, res) {
    let id = qs.parse(url.parse(req.url).query).id;
    let homestay = await HomeStayModel.getHomeById(id);
    if (req.method === "GET") {
      fs.readFile("./src/view/edit.html", "utf-8", (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          data = data.replace("{name}", homestay[0].NAME);
          data = data.replace("{bedroom}", homestay[0].BEDROOM);
          data = data.replace("{restroom}", homestay[0].RESTROOM);
          data = data.replace("{price}", homestay[0].PRICE);
          data = data.replace("{des}", homestay[0].DES);
          res.write(data);
          res.end();
        }
      });
    } else if (req.method === "POST") {
      let parsedData = "";
      req.on("data", (chunk) => {
        parsedData += chunk;
      });
      req.on("end", async () => {
        parsedData = qs.parse(parsedData);
        await HomeStayModel.updateHome(
          id,
          parsedData.homeStayName,
          parsedData.homeStayCity,
          parsedData.homeStayBedroom,
          parsedData.homeStayPrice,
          parsedData.homeStayDes
        ).catch((err) => {
          console.log(err);
        });
        res.writeHead(301, { Location: "/" });
        res.end();
      });
    }
  }

  notFound(req, res) {
    fs.readFile("./src/view/404.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });
  }

  addHomeStay(req, res) {
    if (req.method === "GET") {
      fs.readFile("./src/view/add.html", "utf-8", (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          res.end();
        }
      });
    } else {
      let homeStayData = "";
      req.on("data", (chunk) => {
        homeStayData += chunk;
      });
      req.on("end", async () => {
        homeStayData = qs.parse(homeStayData);
        await homestayModel.addHome(
          homeStayData.homeStayName,
          homeStayData.homeStayCity,
          homeStayData.homeStayBedroom,
          homeStayData.homeStayRestroom,
          homeStayData.homeStayPrice,
          homeStayData.homeStayDes
        );
        res.writeHead(301, { Location: "/" });
        res.end(`done`);
      });
    }
  }
}

module.exports = new HomeController();
