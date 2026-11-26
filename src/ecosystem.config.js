/** EDITAR ESTE ARCHIVO PARA SER UTILIZADO EN EL DESPLIEGUE DE AMBIENTES EN GITLAB MAG*/
module.exports = {
  apps: [
    {
      name: 'api_interoperabilidad',
      exec_mode: 'cluster',
      instances: '2',
      script: './main.js',
      args: 'start',
      /**TODO: AMBIENTE DE DESARROLLO */
      env_des: {
        NODE_ENV: 'des',
        PORT_DEFAULT: 3056,
        NAME_PROYECT: 'api_interoperabilidad',
        DETAIL_PROYECT: 'Lógica de negocio de un proyecto específico',
        VERSION: 1.5,
        HOST_SWAGGER: 'http://10.10.1.243:3056',
        DETAIL_SWAGGER: 'Servidor de desarrollo',
        API_KEY_PROD: '6PxFc1GiLz8i2EWuJkj9qrJOrqjTNW4h',
        MICRO_PRODUCTOR_FINDBYID:
          'http://10.10.1.243:3055/micro-template/v1/productor',
        MICRO_PRODUCTOR_FINDALL:
          'http://10.10.1.243:3055/micro-template/v1/productor/findAll',
        MICRO_PRODUCTOR_CREATE:
          'http://10.10.1.243:3055/micro-template/v1/productor/create',
        MICRO_PRODUCTOR_UPDATE:
          'http://10.10.1.243:3055/micro-template/v1/productor/update',
        MICRO_PRODUCTOR_PAGINATE:
          'http://10.10.1.243:3055/micro-template/v1/productor/paginate/findAll',
        MICRO_PERSONA_FINDBY_CED:
          'http://10.10.1.243:3055/micro_interoperabilidad/persona',
        ENV: 'desarrollo',
        ID_APP: 92,
      },
      /**TODO: AMBIENTE DE PRUEBAS */
      env_test: {
        NODE_ENV: 'test',
        PORT_DEFAULT: 3056,
        NAME_PROYECT: 'api_interoperabilidad',
        DETAIL_PROYECT: 'Lógica de negocio de un proyecto específico',
        VERSION: 1.5,
        HOST_SWAGGER: 'http://10.10.1.105:3056',
        DETAIL_SWAGGER: 'Servidor de pruebas',
        API_KEY_PROD: '6PxFc1GiLz8i2EWuJkj9qrJOrqjTNW4h',
        MICRO_PRODUCTOR_FINDBYID:
          'http://10.10.1.105:3055/micro-template/v1/productor',
        MICRO_PRODUCTOR_FINDALL:
          'http://10.10.1.105:3055/micro-template/v1/productor/findAll',
        MICRO_PRODUCTOR_CREATE:
          'http://10.10.1.105:3055/micro-template/v1/productor/create',
        MICRO_PRODUCTOR_UPDATE:
          'http://10.10.1.105:3055/micro-template/v1/productor/update',
        MICRO_PRODUCTOR_PAGINATE:
          'http://10.10.1.105:3055/micro-template/v1/productor/paginate/findAll',
        MICRO_PERSONA_FINDBY_CED:
          'http://10.10.1.105:3055/micro_interoperabilidad/persona',
        ENV: 'pruebas',
        ID_APP: 92,
      },
      /**AMBIENTE DE PRODUCCIÓN */
      env_prod: {
        //NODE_ENV: 'prod',
        NODE_ENV: 'des',
        PORT_DEFAULT: 3056,
        NAME_PROYECT: 'api_interoperabilidad',
        DETAIL_PROYECT: 'Lógica de negocio de un proyecto específico',
        VERSION: 1.5,
        HOST_SWAGGER: 'http://10.10.1.243:3056',
        DETAIL_SWAGGER: 'Servidor de desarrollo',
        API_KEY_PROD: '6PxFc1GiLz8i2EWuJkj9qrJOrqjTNW4h',
        MICRO_PRODUCTOR_FINDBYID:
          'http://10.10.1.243:3055/micro-template/v1/productor',
        MICRO_PRODUCTOR_FINDALL:
          'http://10.10.1.243:3055/micro-template/v1/productor/findAll',
        MICRO_PRODUCTOR_CREATE:
          'http://10.10.1.243:3055/micro-template/v1/productor/create',
        MICRO_PRODUCTOR_UPDATE:
          'http://10.10.1.243:3055/micro-template/v1/productor/update',
        MICRO_PRODUCTOR_PAGINATE:
          'http://10.10.1.243:3055/micro-template/v1/productor/paginate/findAll',
        MICRO_PERSONA_FINDBY_CED:
          'http://10.10.1.243:3055/micro_interoperabilidad/persona',
        ENV: 'desarrollo', //produccion
        ID_APP: 92,
      },
    },
  ],
};
