import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import socket from './clientSocketInstance'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY

const Map = ({ orderData }) => {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    let location = [77.644, 12.9614]

    socket.on('sendLocation', loc => {
      location = [loc.longitude, loc.latitude]
    })

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [
        orderData.customer.coordinates.longitude,
        orderData.customer.coordinates.latitude
      ],
      zoom: 18
    })

    // Creates new directions control instance
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      interactive: false,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: false,
        instructions: false
      }
    })

    // Set origin and destination
    map.on('load', function () {
      directions.actions.setOriginFromCoordinates([
        orderData.customer.coordinates.longitude,
        orderData.customer.coordinates.latitude
      ])
      directions.actions.setDestinationFromCoordinates([
        orderData.restaurant.coordinates.longitude,
        orderData.restaurant.coordinates.latitude
      ])
    })

    let updateSource = ''

    map.on('load', () => {
      // Get the initial location of the deliveryPartner.

      map.loadImage(
        'https://res.cloudinary.com/vivekgeekskool/image/upload/v1651041678/ju6sgthzmfdahfzej5qx.png',
        function (error, image) {
          if (error) throw error
          map.addImage('scooter', image)
        }
      )

      const geojson = getLocation()

      map.addSource('deliveryPartner', {
        type: 'geojson',
        data: geojson
      })

      // Add the rocket symbol layer to the map.
      map.addLayer({
        id: 'deliveryPartner',
        type: 'symbol',
        source: 'deliveryPartner',
        layout: {
          'icon-image': 'scooter',
          'icon-size': 0.75
        }
      })

      // Update the source every 2 seconds.
      updateSource = setInterval(() => {
        const geojson = getLocation(updateSource)
        map.getSource('deliveryPartner').setData(geojson)
      }, 2000)

      function getLocation (updateSource) {
        try {
          const { latitude, longitude } = {
            latitude: location[1],
            longitude: location[0]
          }

          // Fly the map to the location.
          map.flyTo({
            center: [longitude, latitude],
            speed: 3
          })

          // Return the location of the deliveryPartner as GeoJSON.
          return {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [longitude, latitude]
                }
              }
            ]
          }
        } catch (err) {
          // If the updateSource interval is defined, clear the interval to stop updating the source.
          if (updateSource) clearInterval(updateSource)
          throw new Error(err)
        }
      }
    })

    // Integrates directions control with map
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')
    map.addControl(directions, 'top-left')

    // clean up on unmount
    return () => {
      map.remove()
      clearInterval(updateSource)
    }
  }, [])

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: '95vw',
        height: '70vh',
        border: 'solid 1px black',
        zIndex: 0
      }}
    />
  )
}

export default Map
