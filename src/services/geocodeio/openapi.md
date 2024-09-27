---
id: geocodeio
title: OpenAPI Spec
description: This document provides the OpenAPI specification for Geocodio's RESTful API.
---

```yaml
openapi: 3.0.1
info:
  title: Geocodio
  description: |
    Geocodio's RESTful API allows you to perform forward and reverse geocoding lookups. We support both batch requests as well as individual lookups.
    
    You can also optionally ask for data appends such as timezone, Congressional districts or similar things of that nature.
  termsOfService: https://www.geocod.io/terms-of-use/
  contact:
    email: hello@geocod.io
  version: 1.7.0
externalDocs:
  description: Find out more about Geocodio
  url: https://www.geocod.io
servers:
- url: https://api.geocod.io/v1.7
  description: Standard Geocodio API Endpoint
- url: https://api.enterprise.geocod.io/v1.7
  description: Special Geocodio API Endpoint for Enterprise Customers
tags:
- name: geocode
  description: Geocode addresses to coordinates
- name: reverse
  description: Reverse geocode coordinates to addresses
paths:
  /geocode:
    get:
      tags:
      - geocode
      summary: Geocode single address
      description: |
        You can either use the `q` parameter for a full address query or a combination of `street`, `city`, `state`, `postal_code`, and/or `country` for when the address is already stored as separate fields on your end.
      operationId: geocodeSingle
      parameters:
      - name: q
        in: query
        description: The query (i.e. address) to geocode
        schema:
          type: string
      - name: fields
        in: query
        description: Comma-separated list of fields to append
        schema:
          $ref: '#/components/schemas/Fields'
        style: form
        explode: false
      - name: street
        in: query
        example: 1600 Pennsylvania Ave NW
        description: Can be used as an alternative to the `q` parameter
        schema:
          type: string
      - name: city
        in: query
        example: Washington
        description: Can be used as an alternative to the `q` parameter
        schema:
          type: string
      - name: state
        in: query
        example: DC
        description: Can be used as an alternative to the `q` parameter
        schema:
          type: string
      - name: postal_code
        in: query
        example: 20500
        description: Can be used as an alternative to the `q` parameter
        schema:
          type: string
      - name: country
        in: query
        example: US
        description: Defaults to USA
        schema:
          type: string
      - name: limit
        in: query
        example: US
        description: Optional parameter. The maximum number of results to return. The default is no limit.
        schema:
          type: integer
      - name: format
        in: query
        example: simple
        description: Optional parameter to change the output format of the JSON response to a different structure
        schema:
          type: string
          enum: [simple]
      responses:
        200:
          description: Successfully geocoded address
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GeocodingResult'
        422:
          description: A client error prevented the request from executing successfully (e.g. invalid address provided). A JSON object will be returned with an error key containing a full error message
        403:
          description: Invalid API key, or other reason why access is forbidden.
      security:
        - geocodioApiKey: []
    post:
      tags:
      - geocode
      summary: Geocode batch of addresses
      description: Up to 10,000 addresses can be geocoded per batch
      operationId: geocodeBatch
      parameters:
      - name: fields
        in: query
        description: Comma-separated list of fields to append
        schema:
          $ref: '#/components/schemas/Fields'
        style: form
        explode: false
      - name: limit
        in: query
        example: US
        description: Optional parameter. The maximum number of results to return. The default is no limit.
        schema:
          type: integer
      requestBody:
        description: List of addresses to geocode. Can either be an array or an object with keys of your choice.
        content:
          application/json:
            schema:
              oneOf:
                - $ref: '#/components/schemas/BatchGeocodeArray'
                - $ref: '#/components/schemas/BatchGeocodeObject'
        required: true
      responses:
        200:
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      type: object
                      properties:
                        query:
                          type: string
                        response:
                          $ref: '#/components/schemas/GeocodingResult'
        403:
          description: Invalid API key, or other reason why access is forbidden.
      security:
        - geocodioApiKey: []
  /reverse:
    get:
      tags:
      - reverse
      summary: Reverse geocode single address
      operationId: reverseSingle
      parameters:
      - name: q
        in: query
        description: The query (i.e. latitude/longitude pair) to reverse geocode
        schema:
          type: string
          example: "38.9002898,-76.9990361"
      - name: fields
        in: query
        description: Comma-separated list of fields to append
        schema:
          $ref: '#/components/schemas/Fields'
        style: form
        explode: false
      responses:
        200:
          description: Successfully geocoded coordinate
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ReverseGeocodingResult'
        422:
          description: A client error prevented the request from executing successfully (e.g. invalid coordinate provided). A JSON object will be returned with an error key containing a full error message
        403:
          description: Invalid API key, or other reason why access is forbidden.
      security:
        - geocodioApiKey: []
    post:
      tags:
      - reverse
      summary: Reverse geocode batch of coordinates
      description: Up to 10,000 coordinates can be reverse geocoded per batch
      operationId: reverseBatch
      parameters:
      - name: fields
        in: query
        description: Comma-separated list of fields to append
        schema:
          $ref: '#/components/schemas/Fields'
        style: form
        explode: false
      requestBody:
        description: List of coordinates to reverse geocode. Can either be an array or an object with keys of your choice.
        content:
          application/json:
            schema:
              oneOf:
                - $ref: '#/components/schemas/BatchReverseGeocodeArray'
                - $ref: '#/components/schemas/BatchReverseGeocodeObject'
        required: true
      responses:
        200:
          description: successful operation
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      type: object
                      properties:
                        query:
                          type: string
                        response:
                          $ref: '#/components/schemas/ReverseGeocodingResult'
        403:
          description: Invalid API key, or other reason why access is forbidden.
      security:
        - geocodioApiKey: []
components:
  schemas:
    BatchGeocodeArray:
      type: array
      items:
        type: string
        example: "1109 N Highland St, Arlington, VA 22201"
        description: "When using a JSON array, results are guaranteed to be returned in the same order as they are requested."
    BatchGeocodeObject:
      type: object
      example:
        yourCustomKey: "1109 N Highland St, Arlington, VA 22201"
      description: "If a JSON object is posted, you can specify a custom key for each element of your choice. This can be useful to match queries up with your existing data after the request is complete."
    BatchReverseGeocodeArray:
      type: array
      items:
        type: string
        example: "35.9746000,-77.9658000"
        description: "When using a JSON array, results are guaranteed to be returned in the same order as they are requested."
    BatchReverseGeocodeObject:
      type: object
      example:
        yourCustomKey: "35.9746000,-77.9658000"
      description: "If a JSON object is posted, you can specify a custom key for each element of your choice. This can be useful to match queries up with your existing data after the request is complete."
    GeocodingResult:
      type: object
      properties:
        input:
          type: object
          properties:
            address_components:
              $ref: '#/components/schemas/AddressComponents'
            formatted_address:
              type: string
        results:
          $ref: '#/components/schemas/AddressResult'
    ReverseGeocodingResult:
      type: object
      properties:
        results:
          $ref: '#/components/schemas/AddressResult'
    AddressResult:
      type: array
      items:
        type: object
        properties:
          address_components:
            $ref: '#/components/schemas/AddressComponents'
          formatted_address:
            type: string
          location:
            type: object
            properties:
              lat:
                type: number
                format: float
              lng:
                type: number
                format: float
          accuracy:
            type: number
            format: float
          accuracy_type:
            type: string
            enum:
              - rooftop
              - point
              - range_interpolation
              - nearest_rooftop_match
              - street_center
              - place
              - state
          source:
            type: string
          fields:
            type: object
            properties:
              congressional_districts:
                $ref: '#/components/schemas/FieldCongressionalDistricts'
              state_legislative_districts:
                $ref: '#/components/schemas/FieldStateLegislativeDistricts'
              school_districts:
                $ref: '#/components/schemas/FieldSchoolDistricts'
              timezone:
                $ref: '#/components/schemas/FieldTimezone'
              census:
                $ref: '#/components/schemas/FieldCensus'
              zip4:
                $ref: '#/components/schemas/FieldZip4'
    FieldCongressionalDistricts:
      type: array
      items:
        type: object
        properties:
          name:
            type: string
          district_number:
            type: integer
          ocd_id:
            type: string
          congress_number:
            type: string
          congress_years:
            type: string
          proportion:
            type: number
          current_legislators:
            $ref: '#/components/schemas/FieldCongressionalDistrictLegislators'
    FieldCongressionalDistrictLegislators:
      type: array
      items:
        type: object
        properties:
          type:
            type: string
          bio:
            type: object
            properties:
              last_name:
                type: string
              first_name:
                type: string
              birthday:
                type: string
              gender:
                type: string
              party:
                type: string
          contact:
            type: object
            properties:
              url:
                type: string
              address:
                type: string
              phone:
                type: string
              contact_form:
                type: string
          social:
            type: object
            properties:
              rss_url:
                type: string
              twitter:
                type: string
              facebook:
                type: string
              youtube:
                type: string
              youtube_id:
                type: string
          references:
            type: object
            properties:
              bioguide_id:
                type: string
              thomas_id:
                type: string
              opensecrets_id:
                type: string
              lis_id:
                type: string
              cspan_id:
                type: string
              govtrack_id:
                type: string
              votesmart_id:
                type: string
              ballotpedia_id:
                type: string
              washington_post_id:
                type: string
              icpsr_id:
                type: string
              wikipedia_id:
                type: string
          source:
            type: string
    FieldStateLegislativeDistricts:
      type: array
      items:
        type: object
        properties:
          senate:
            type: array
            items:
              $ref: '#/components/schemas/FieldStateLegislativeDistrict'
          house:
            type: array
            items:
              $ref: '#/components/schemas/FieldStateLegislativeDistrict'
    FieldStateLegislativeDistrict:
      type: object
      properties:
        name:
          type: string
        district_number:
          type: string
        ocd_id:
          type: string
        is_upcoming_state_legislative_district:
          type: boolean
        proportion:
          type: number
    FieldSchoolDistricts:
      type: object
      properties:
        elementary:
          $ref: '#/components/schemas/FieldSchoolDistrict'
        secondary:
          $ref: '#/components/schemas/FieldSchoolDistrict'
        unified:
          $ref: '#/components/schemas/FieldSchoolDistrict'
    FieldSchoolDistrict:
      type: object
      properties:
        name:
          type: string
        lea_code:
          type: string
        grade_low:
          type: string
        grade_high:
          type: string
    FieldTimezone:
      type: object
      properties:
        name:
          type: string
        utc_offset:
          type: number
        observes_dst:
          type: boolean
        abbreviation:
          type: string
        source:
          type: string
    FieldCensus:
      type: object
      properties:
        census_year:
          type: number
        state_fips:
          type: string
        county_fips:
          type: string
        place_fips:
          type: string
        tract_code:
          type: string
        block_code:
          type: string
        block_group:
          type: string
        full_fips:
          type: string
        metro_micro_statistical_area:
          type: object
          properties:
            name:
              type: string
            area_code:
              type: string
            type:
              type: string
              enum:
                - metropolitan
                - micropolitan
        combined_statistical_area:
          type: object
          properties:
            name:
              type: string
            area_code:
              type: string
        metropolitan_division:
          type: object
          properties:
            name:
              type: string
            area_code:
              type: string
        source:
          type: string
    FieldZip4:
      type: object
      properties:
        record_type:
          type: object
          properties:
            code:
              type: string
            description:
              type: string
        carrier_route:
          type: object
          properties:
            id:
              type: string
            description:
              type: string
        building_or_firm_name:
          type: string
        plus4:
          type: array
          items:
            type: string
        zip9:
          type: array
          items:
            type: string
        government_building:
          type: boolean
        facility_code:
          type: object
          properties:
            code:
              type: string
            description:
              type: string
        city_delivery:
          type: boolean
        valid_delivery_area:
          type: boolean
        exact_match:
          type: boolean
    AddressComponents:
      type: object
      properties:
        number:
          type: string
        predirectional:
          type: string
        prefix:
          type: string
        street:
          type: string
        suffix:
          type: string
        postdirectional:
          type: string
        secondaryunit:
          type: string
        secondarynumber:
          type: string
        city:
          type: string
        county:
          type: string
        state:
          type: string
        zip:
          type: string
        country:
          type: string
        formatted_street:
          type: string
    Fields:
      type: array
      items:
        type: string
        enum:
          - cd
          - cd116
          - cd115
          - cd114
          - cd113
          - stateleg
          - school
          - timezone
          - census
          - census2000
          - census2010
          - census2011
          - census2012
          - census2013
          - census2014
          - census2015
          - census2016
          - census2017
          - census2018
          - census2019
          - census2020
          - provriding
          - riding
          - zip4
          - acs-demographics
          - acs-economics
          - acs-families
          - acs-housing
          - acs-social
  securitySchemes:
    geocodioApiKey:
      type: apiKey
      name: api_key
      in: query
```
