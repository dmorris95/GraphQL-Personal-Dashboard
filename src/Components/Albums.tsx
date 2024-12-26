import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_ALBUMS, GET_ALBUM_PHOTOS } from '../Queries/Queries';
import { Container, Card, Row, Col, Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Albums: React.FC<{ searchQuery: string }> = ({ searchQuery: searchQuery}) => {
    const { userId } = useParams<{ userId: string }>();
    const { data, loading, error } = useQuery(GET_USER_ALBUMS, {
        variables: { id: Number(userId) },
    });
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
    const [showPhotos, setShowPhotos] = useState(false);

    const handleClose = () => setShowPhotos(false);

    const handleShowPhotos = (albumId: number) => {
        setSelectedAlbumId(albumId);
        setShowPhotos(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const filteredAlbums = data.user.albums.data.filter((album: any) =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container>
            <Row>
                {filteredAlbums.map((album: any) => (
                    <Col key={album.id} sm={12} md={6} lg={4} className='mb-3'>
                        <Card onClick={() => handleShowPhotos(album.id)}>
                            <Card.Body>
                                <Card.Title>
                                    {album.title}
                                </Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            {selectedAlbumId && <PhotoModal albumId={selectedAlbumId} show={showPhotos} handleClose={handleClose} />}
        </Container>
    );
};

// Photo Modal that displays photos within the album
const PhotoModal: React.FC<{ albumId: number, show: boolean, handleClose: () => void }> = ({ albumId, show, handleClose }) => {
    const { data, loading, error } = useQuery(GET_ALBUM_PHOTOS, {
        variables: { id: albumId }, 
    });

    if (loading) return <p>Loading photos...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    {data.album.photos.data.map((photo: any) => (
                        <Col key={photo.id} sm={12} md={6} lg={4} className='mb-3'>
                            <Card>
                                <Card.Img variant='top' src={photo.thumbnailUrl} />
                                <Card.Body>
                                    <Card.Title>{photo.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Albums;
