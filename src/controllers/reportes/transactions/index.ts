import { NextFunction, Request, Response } from 'express';
import { sqlConfig } from '../../../utils/sqlConfig';
import sql from 'mssql';

export const getTransactions = async (
	req: Request<any>,
	res: Response<any>,
	next: NextFunction
): Promise<void> => {
	const { dataTerminal } = req.params;

	const { terminal, dateInit, dateEnd } = JSON.parse(dataTerminal as string);

	if (!terminal) {
		throw { message: 'Es necesario un numero de Terminal', code: 400 };
	}

	//console.log(terminal, ' -- ', dateInit, ' + ', dateEnd);

	if (!terminal || !dateInit || !dateEnd)
		throw { message: 'Es necesario un numero de Terminal y un rango de fecha', code: 400 };

	const auxDateInit = new Date(dateInit);
	const auxDateEnd = new Date(dateEnd);

	let fechaInicio: string = `${auxDateInit.getFullYear()}-${auxDateInit.getMonth() + 1}-${auxDateInit.getDate()}`;
	let fechaFin: string = `${auxDateEnd.getFullYear()}-${auxDateEnd.getMonth() + 1}-${auxDateEnd.getDate()}`;

	try {
		await sql.connect(sqlConfig);
		console.log('conection ok transactions');

		const query = `
      SELECT * FROM OPENQUERY([PRUEBA_7218], '
        SELECT 
          right(card_acceptor_id_code, 9) as afiliado, 
          card_acceptor_term_id as terminal, 
          right(left(source_node_additional_data, 10), 4) as lote, 
          case sink_node 
            WHEN ''sktandem'' THEN ''Credito''
            WHEN ''sktandem1'' THEN ''Tebca''  ELSE ''Debito'' END origen, 
            LEFT(pan,6) + ''****'' + right(pan,4) as pan,
          isnull(isnull(in_req,in_adv),isnull(in_rev,in_recon_adv)) fecha, 
          ret_ref_no AS referencia, 
          auth_id_rsp AS authoriz, 
          case msg_type
            WHEN 512 THEN ''Compra''
            WHEN 1312 THEN ''Cierre_Lote''   
            WHEN 1056 THEN ''Reverso'' END ''tp_transaction'',
          CAST(convert(money, source_node_amount_requested/100) as varchar) monto  
          FROM [tm_trans_base].[dbo].[tm_trans] (NOLOCK)
          WHERE rsp_code_req_rsp = ''00'' and card_acceptor_term_id = ${terminal} AND 
            (in_req between ''${fechaInicio} 00:00:00.000'' and ''${fechaFin} 00:00:00.000'' or 
            in_rev between ''${fechaInicio} 00:00:00.000'' and ''${fechaFin} 00:00:00.000'' or
            in_recon_adv between ''${fechaInicio} 00:00:00.000'' and ''${fechaFin} 00:00:00.000'')
          ORDER BY tran_nr
      ')
		`;

		const response: any = await sql.query(query);
		//console.log('res ok');

		let transacciones = response.recordset;

		if (!transacciones.length) throw { message: 'No se encontro ninguna transaccion', code: 400 };

		res.status(200).json({ transacciones });
	} catch (err) {
		res.status(400).json(err);
		//next(err)
	}
};
