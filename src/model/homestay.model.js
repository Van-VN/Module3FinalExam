const BaseModel = require("./base.model");

class HomeStayModel extends BaseModel {
  async getAllHome() {
    let sql = `SELECT * FROM HOMESTAY`;
    return await this.querySql(sql);
  }

  async getHomeById(id) {
    let sql = `SELECT * FROM HOMESTAY WHERE ID = ${id}`;
    return await this.querySql(sql);
  }

  async deleteHome(id) {
    let sql = `DELETE FROM HOMESTAY WHERE ID = ${id}`;
    return await this.querySql(sql);
  }

  async addHome(homeName, homeCity, homeBed, homeRest, homePrice, homeDes) {
    let sql = `INSERT INTO HOMESTAY(NAME, CITY, BEDROOM, RESTROOM, PRICE, DES)
        VALUES('${homeName}','${homeCity}',${homeBed},${homeRest},${homePrice},'${homeDes}')`;
    return await this.querySql(sql);
  }

  async updateHome(
    id,
    homeName,
    homeCity,
    homeBed,
    homeRest,
    homePrice,
    homeDes
  ) {
    let sql = `UPDATE HOMESTAY
        SET NAME= '${homeName}', 
        CITY= '${homeCity}', 
        BEDROOM=${homeBed}, 
        RESTROOM=${homeRest}, 
        PRICE=${homePrice}, 
        DES= '${homeDes}'
        WHERE ID =${id}`;
    return await this.querySql(sql);
  }
}

module.exports = new HomeStayModel();
