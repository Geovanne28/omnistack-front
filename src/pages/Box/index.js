import React, { Component } from 'react';
import api from '../../services/api';

import {MdInsertDriveFile} from 'react-icons/md'; //Icones
import {distanceInWords} from 'date-fns'; //Lib para brincar com datas
import pt from 'date-fns/locale/pt'; // Idioma da data
import Dropzone from 'react-dropzone'  // Manipular arquivos, arrastar, upload e etc
import socket from 'socket.io-client'

import './styles.css';
import logo from '../../assets/logo.jpg';

export default class Box extends Component {

  state = {
    box: {},
  }

  //Funçao quando o component é criado
  async componentDidMount(){

    this.subscribeNewFiles();

    const box      = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    this.setState({box: response.data});
  }

  //Subir arquivos e enviando para backend
  handleUpload = (files) => {
    files.forEach(file => {
      
      const box  = this.props.match.params.id;
      const data = new FormData();
      data.append('file', file);

      api.post(`boxes/${box}/files`, data);
    })
  }

  subscribeNewFiles = () =>{
    const box  = this.props.match.params.id;
    const io = socket('http://localhost:3333');

    io.emit('connectRoom', box);

    io.on('file', data => {
      this.setState({box: {...this.state.box, files: [
        data,
        ...this.state.box.files
      ]}});
    })
  }

  render() {
    return (
      <div id="box-container">
        <header>
          <img src={logo} width={200} alt="" />
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({getRootProps, getInputProps}) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>

        <ul>
          { this.state.box.files && this.state.box.files.map(file => (
            <li key={file._id}>
            <a  className="fileInfo" href={file.url} target="blank">
              <MdInsertDriveFile size={24} color="#000" />
              <strong>{file.title}</strong>
            </a>
            <span>
              Há{" "}
              {
                distanceInWords(file.createdAt, new Date(), {
                  locale: pt
                })
              }
          </span>
          </li>
          ))}
        </ul>
      </div>
    );
  }
}
