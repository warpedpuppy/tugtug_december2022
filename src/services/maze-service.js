import config from '../config'
import TokenService from './token-service'
import DefaultMaze from '../defaults/DefaultMaze';
import axios from 'axios';
const MazeService = {
  mazes: [DefaultMaze],

  getMazes() {
	return this.mazes;
  },
  setIdsAndActiveMazeId () {

  },
  async load_ids () {
    try {
      const res = await fetch(`${config.API_URL}/tugtug/get-grid-ids`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      return error
    }
  },
  async getOneMaze (id) {
    try {
      const res = await fetch(`${config.API_URL}/tugtug/get-grid`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ id })
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      console.log('get one maze error')
      return DefaultMaze; //error
    }
  },
  async loadAllMazes () {
    try {
      const res = await axios.get(`${config.API_URL}/api/tugtug/all-mazes`, {
        headers: {
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        }
      })
      return [...res.data.mazes, ...this.mazes];
    }
    catch (error) {
      return this.mazes
    }
  },
  async saveMaze (data) {
    
    let body = JSON.stringify({ data })
    console.log(body, TokenService.getAuthToken())
    try {
      const res = await fetch(`${config.API_URL}/api/tugtug/new-maze`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        },
        body
      })
      const res_1 = await res.json()
      if (res_1.success) {
        return res_1
      }
      return false
    }
    catch (error) {
      return error
    }
  },
  async deleteMaze (id) {
    try {
      const res = await fetch(`${config.API_URL}/tugtug/delete-maze`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify({ id })
      })
      const res_1 = await res.json()
      return res_1
    }
    catch (error) {
      return error
    }
  }
}
export default MazeService
