import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import styled from "styled-components";
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTimesCircle
} from "@fortawesome/free-solid-svg-icons";

const OverlayStyles = styled.div`
    position:fixed;
    top:5%;
    left:5%;
    right:5%;
    bottom:5%;
    background-color:lightgrey;
    z-index:100;
`

const ImageModalStyles = styled.div`
    position:relative;
    width:100%;
    height:100%;
    padding:2.5rem;
    box-shadow: var(--bs);
    border-radius: var(--border-radius);
    i {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        cursor:pointer;
    }
    .image-container {
        width: 100%;
        height:100%;
        overflow:auto;
        div {
        position: unset !important;
        }

    .image {
        object-fit: contain;
        /* width: 100% !important; */
        position: relative !important;
        height: unset !important;
    }
}

`;

function ImageModal({ open, imgUrl, onClose }: any) {
    if (!open) return null

    return (
        <OverlayStyles>
            <ImageModalStyles>
                <i>
                    <FontAwesomeIcon icon={faTimesCircle} color={"black"} onClick={onClose} />
                </i>
                <div className = "image-container">
                        <Image
                            layout="fill"
                                // // objectFit="cover"
                                // width="100%"
                                // height="100%"
                                src={imgUrl}
                                alt="image"
                                className = "image"
                        />
                </div>
            </ImageModalStyles >
        </OverlayStyles>)
}

export default ImageModal
