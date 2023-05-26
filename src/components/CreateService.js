import { Card, Col, Row,Grid, Image, Tag, Space, Modal, Form, message } from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ListingForm from '../components/ListingForm';
import { DeleteItemList, GetItemList } from "../services";
import Loading from "../shared/loading";
const { useBreakpoint } = Grid;

export const CreateService = ()=>{
    return(
        <Form>
            
        </Form>
    );
};